import dns from 'dns'
import net from "net"


function resolveMxRecords(domain) {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                reject('No MX records found for domain');
            } else {
                resolve(addresses.sort((a, b) => a.priority - b.priority));
            }
        });
    });
}

function verifyEmailOnServer(mxRecords, email) {
    return new Promise((resolve, reject) => {
        const { exchange } = mxRecords[0];
        const socket = net.createConnection(25, exchange);

        socket.on('data', (data) => {
            if (data.toString().includes('220')) {
                socket.write(`EHLO example.com\r\n`);
            } else if (data.toString().includes('250')) {
                if (data.toString().includes('250-STARTTLS')) {
                    socket.write(`MAIL FROM:<example@example.com>\r\n`);
                } else if (data.toString().includes('250 2.1.0')) {
                    socket.write(`RCPT TO:<${email}>\r\n`);
                } else if (data.toString().includes('250 2.1.5')) {
                    socket.write('QUIT\r\n');
                    resolve(true);
                } else if (data.toString().includes('550')) {
                    socket.write('QUIT\r\n');
                    resolve(false);
                }
            }
        });

        socket.on('error', (err) => {
            reject(err);
        });

        socket.on('end', () => {
            reject('Connection ended unexpectedly');
        });
    });
}

async function verifyEmail(email) {
    const domain = email.split('@')[1];
    try {
        const mxRecords = await resolveMxRecords(domain);
        const isValid = await verifyEmailOnServer(mxRecords, email);
        return isValid;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Example usage



export { verifyEmail };