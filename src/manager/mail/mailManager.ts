import {emailAdapter} from "../../adapters/emailAdapter";


export const mailManager = {
    async sendConfirmationMail (subject: string, email: string, code: string) {

        const htmlMessage = ` <h1>Thanks for your registration dear ${subject}</h1>
                        <p>To finish registration please follow the link below:
                                <a href='https://node-hw.vercel.app/confirm-email?code=${code}'>complete registration</a>
                        </p>`
        return await emailAdapter.send(subject, email, htmlMessage)
    }
}