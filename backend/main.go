package main

import (
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"log"
	"fmt"
	"net/http"
	"net/smtp"
	"strconv"
)

const responseOK			string = `{"response":200}`
const responseBadInput		string = `{"response":400}`
const responseInternalError	string = `{"response":500}`

type config struct {
	SMTPServer	string	`yaml:"smtp_server"`
	SMTPPort	int		`yaml:"smtp_port"`
	SenderLogin	string	`yaml:"sender_login"`
	SenderPass	string	`yaml:"sender_pass"`
	Recipient	string	`yaml:"recipient"`
}

func dumpConfig(conf *config) {
	fmt.Println(*conf)
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "pireactor")
}

func smtpEndpoint(conf *config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// parse input
		err := r.ParseForm()
		if err != nil {
			log.Println("parsing form error: #%v", err)
			fmt.Fprintf(w, responseBadInput)
			dumpConfig(conf)
			return
		}

		ClientName := r.PostForm.Get("name")
		ClientContact := r.PostForm.Get("contact")
		BriefDescription := r.PostForm.Get("brief_description")
		MessageBody := fmt.Sprintf("Client: %s\r\nContacts: %s\r\nBrief description: %s\r\n",
							ClientName, ClientContact, BriefDescription)

		log.Println("New client: " + MessageBody);
		// establishing SMTP connection
		auth := smtp.PlainAuth("pireactor", conf.SenderLogin, conf.SenderPass, conf.SMTPServer)

		// composing the message
		to := []string{conf.Recipient}
		msg := []byte("To: " + conf.Recipient + "\r\n" +
			"Subject: " + ClientName + "\r\n\r\n" +
			MessageBody + "\r\n")

		// sending it
		err = smtp.SendMail(conf.SMTPServer + ":" + strconv.Itoa(conf.SMTPPort), auth, conf.SenderLogin, to, msg)
		if err != nil {
			log.Println("sending an email error: #%v", err)
			fmt.Fprintf(w, responseInternalError)
			dumpConfig(conf)
		}

		// OK
		fmt.Fprintf(w, responseOK)
	}
}

func main() {
	fmt.Println("pireactor email notificator v1.0")
	// read configuration file config.yaml
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		log.Fatalf("reading config file error: #%v", err)
	}

	conf := &config{}
	err = yaml.Unmarshal(yamlFile, conf)
	if err != nil {
		log.Fatalf("Unmarshalling config error: %v", err)
	}

	// setup http server
	srv := http.Server{Addr: ":8081"}
	http.HandleFunc("/", mainPage)
	http.HandleFunc("/project", smtpEndpoint(conf))
	log.Fatal(srv.ListenAndServe())
}

