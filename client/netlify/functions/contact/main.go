package main

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"net/smtp"
	"os"
	"strconv"
)

const responseOK string = `{"errcode":200}`
const responseBadConfigFile string = `{"errcode":201}`
const responseBadConfigContent string = `{"errcode":202}`
const responseSMTPError string = `{"errcode":201}`

type config struct {
	SMTPServer  string `yaml:"smtp_server"`
	SMTPPort    int    `yaml:"smtp_port"`
	SenderLogin string `yaml:"sender_login"`
	SenderPass  string `yaml:"sender_pass"`
	Recipient   string `yaml:"recipient"`
}

func buildResponse(body string) *events.APIGatewayProxyResponse {
	finalBody := "cwd: " + os.Getwd() + "; message: " + body
	return &events.APIGatewayProxyResponse{
		StatusCode:      200,
		Headers:         map[string]string{"Content-Type": "text/plain"},
		Body:            finalBody,
		IsBase64Encoded: false,
	}
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	// parse yaml config
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		return buildResponse(responseBadConfigFile), nil
	}

	conf := &config{}
	err = yaml.Unmarshal(yamlFile, conf)
	if err != nil {
		return buildResponse(responseBadConfigContent), nil
	}

	// establishing a smtp connection
	auth := smtp.PlainAuth("pireactor", conf.SenderLogin, conf.SenderPass, conf.SMTPServer)

	// composing the message
	to := []string{conf.Recipient}
	msg := []byte("To: " + conf.Recipient + "\r\n" +
		"Subject: new client\r\n\r\n" +
		request.Body + "\r\n")

	// sending it
	err = smtp.SendMail(conf.SMTPServer+":"+strconv.Itoa(conf.SMTPPort), auth, conf.SenderLogin, to, msg)
	if err != nil {
		return buildResponse(responseSMTPError), nil
	}

	return buildResponse(responseOK), nil
}

func main() {
	// Make the handler available for Remote Procedure Call
	lambda.Start(handler)
}
