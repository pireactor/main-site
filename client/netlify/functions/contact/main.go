package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"log"
	"net/smtp"
	"os"
)

const responseOK string = `{"errcode":200}`
const responseBadEnvVar string = `{"errcode":201}`
const responseSMTPError string = `{"errcode":202}`

func buildResponse(body string, errordesc error) *events.APIGatewayProxyResponse {
	cwd, _ := os.Getwd()
	finalBody := "cwd: " + cwd
	if errordesc != nil {
		finalBody = finalBody + "; errordesc: " + errordesc.Error()
	}
	finalBody = finalBody + "; message: " + body

	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            finalBody,
		IsBase64Encoded: false,
	}
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// read and verify environment variables
	conf := map[string]string{
		"SMTP_SERVER":  "",
		"SMTP_PORT":    "",
		"SENDER_LOGIN": "",
		"SENDER_PASS":  "",
		"RECIPIENT":    "",
	}

	log.Println("looking up environment variables")
	for k, _ := range conf {
		val, ok := os.LookupEnv(k)
		log.Println("looking up " + k)
		if !ok {
			return buildResponse(responseBadEnvVar, nil), nil
		}

		conf[k] = val
	}

	// establishing a smtp connection
	log.Println("establishing an smtp connection")
	auth := smtp.PlainAuth("pireactor", conf["SENDER_LOGIN"], conf["SENDER_PASS"], conf["SMTP_SERVER"])

	// composing the message
	to := []string{conf["RECIPIENT"]}
	msg := []byte("To: " + conf["RECIPIENT"] + "\r\n" +
		"Subject: new client\r\n\r\n" +
		request.Body + "\r\n")

	// sending it
	log.Println("sending an e-mail")
	err := smtp.SendMail(conf["SMTP_SERVER"]+":"+conf["SMTP_PORT"], auth, conf["SENDER_LOGIN"], to, msg)
	if err != nil {
		return buildResponse(responseSMTPError, err), nil
	}

	log.Println("returning OK")
	return buildResponse(responseOK, nil), nil
}

func main() {
	// Make the handler available for Remote Procedure Call
	lambda.Start(handler)
}
