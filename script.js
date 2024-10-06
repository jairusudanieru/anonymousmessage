document.getElementById('sendBtn').addEventListener('click', function() {
    const message = document.getElementById('message').value.trim();
    if (!message) return;

    this.disabled = true;
    this.textContent = "Sending...";

    const webhookUrl = "https://discord.com/api/webhooks/1292432984179347508/KG5pSYkjBefnCtT1ahGRrCQbGQQR9AktiUq3ZMzE8P_Y3niIaBxoMkGF8num2SAGwMox"; 
    const avatarUrl = "https://cdn.discordapp.com/attachments/1012234151769931817/1292424601824923759/tegami.jpeg?ex=6703afb5&is=67025e35&hm=d2bfbd0085c61f8af1c9c5260454a9e5f7e2fe8e479eea3e29d3751b04d12040&";
    const title = "### <:emoji_mail:1010906227007574046> New Anonymous Message:";

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            username: "Tegami-chan",
            avatar_url: avatarUrl,
            embeds: [
                {
                    description: title + "\n" + "\"" + message + "\"",
                    color: parseInt('e7d3c4', 16),
                    timestamp: new Date().toISOString()
                }
            ],
        }),
    })

    .then(response => {
        if (response.ok) {
            document.getElementById('message').value = '';
            this.textContent = "Message sent!";

            setTimeout(() => {
                document.getElementById('sendBtn').disabled = false;
            }, 5000);

        } else {
            this.textContent = "Failed to send!";
            document.getElementById('sendBtn').disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.textContent("An error occurred while sending the message!");
        this.disabled = false;
    })
    .finally(() => {
        document.getElementById('message').value = '';
        this.disabled = false;
        this.textContent = "Send to Discord";
    });
});

document.getElementById('message').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});

document.getElementById('message').addEventListener('input', function() {
    const maxLength = 250;
    const currentLength = this.value.length;
    const remaining = maxLength - currentLength;

    document.getElementById('charCount').textContent = `${remaining} characters remaining`;
});