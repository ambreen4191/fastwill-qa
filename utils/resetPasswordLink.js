
const path = require("path");
const gmail = require("gmail-tester");

async function getPasswordResetLink(receiverEmail, subject, startTime) {
    const credentialsPath = path.resolve(__dirname, "../credentials.json");
    const tokenPath = path.resolve(__dirname, "../token.json");

    const safeStartTime = startTime || new Date(Date.now() - 10000);

    const emails = await gmail.check_inbox(
        credentialsPath,
        tokenPath,
        {
            subject: subject,
            to: receiverEmail,
            wait_time_sec: 10,
            max_wait_time_sec: 60,
            include_body: true,
            after: safeStartTime
        }
    );

    if (emails && emails.length > 0) {
        const latestEmail = emails[0];
        const bodyHtml = latestEmail.body.html;

        const linkRegex = /(https:\/\/[a-z]+\.fastwill\.com\/reset-password\/[a-f0-9]+(?:\?email=[^"\s<]+)?)/i;

        const match = bodyHtml.match(linkRegex);

        if (match && match[1]) {
            return match[1].replace(/&amp;/g, '&');
        } else {
            throw new Error("Reset link pattern not found in email body.");
        }
    } else {
        throw new Error("Password reset email not found within timeout.");
    }
}

module.exports = { getPasswordResetLink };
