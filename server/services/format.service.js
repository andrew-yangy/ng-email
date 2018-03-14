export class SendgridFormat {
    constructor(data) {
        this.personalizations = [];
        this.content = [];
        const { to, from, cc, bcc, subject, text } = data;
        this.setFrom(from);
        this.setContent(text);
        this.setPersonalizations(to, cc, bcc, subject);
    }

    setFrom(from) {
        this.from = this.setAddress(from)
    }

    setContent(text) {
        if (typeof text === 'undefined' || text === '') {
            text = 'No Content';
        }
        if (typeof text !== 'string') {
            throw new Error('String expected for `text`');
        }
        this.content = [{
            value: text,
            type: 'text/plain',
        }]
    }

    setPersonalizations(to, cc, bcc, subject) {
        to = this.checkArray(to);
        cc = this.checkArray(cc);
        bcc = this.checkArray(bcc);
        if (
            typeof to === 'undefined' &&
            typeof cc === 'undefined' &&
            typeof bcc === 'undefined'
        ) {
            throw new Error('Provide at least one of to, cc or bcc');
        }
        if (typeof subject === 'undefined' || subject === '') {
            subject = 'No Subject'
        }
        if (typeof subject !== 'string') {
            throw new Error('String expected for `subject`');
        }
        this.personalizations = [{ to, cc, bcc, subject }]
    }

    setAddress(data) {
        if (data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
            return data;
        }
        // handle format if the data front end send does not match
    }

    checkArray(data) {
        if (Array.isArray(data) && !data.length) {
            return null;
        } else {
            return data;
        }
    }
}

export class MailgunFormat {
    constructor(data) {
        const { to, from, cc, bcc, subject, text } = data;
        this.subject = subject;
        this.text = text || 'No Content';
        this.setFrom(from);
        if (Array.isArray(to) && to.length) {
            this.to = this.setAddresses(to)
        }
        if (Array.isArray(cc) && cc.length) {
            this.cc = this.setAddresses(cc)
        }
        if (Array.isArray(bcc) && bcc.length) {
            this.bcc = this.setAddresses(bcc)
        }
    }

    setFrom(from) {
        this.from = this.setAddress(from);
    }

    setAddresses(data) {
        return data.map(address => this.setAddress(address)).join()
    }

    setAddress(data) {
        if (data.hasOwnProperty('name') && data.hasOwnProperty('email')) {
            if (data.name === data.email) {
                return data.email;
            } else {
                return `${data.name} <${data.email}>`
            }
        }
        return '';
        // handle format if the data front end send does not match
    }
}
