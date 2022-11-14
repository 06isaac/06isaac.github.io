// Nodo de elemento de cargador personalizado
var loader = document.createElement('div')
loader.setAttribute('id', 'pre-loader');
loader.innerHTML = "<div class='lds-hourglass'></div>";

// Función de inicio del cargador
window.start_loader = function() {
    if (!document.getElementById('pre-loader') || (!!document.getElementById('pre-loader') && document.getElementById('pre-loader').length <= 0))
        document.querySelector('body').appendChild(loader)
}

// Función de parada del cargador
window.end_loader = function() {
    if (!!document.getElementById('pre-loader')) {
        setTimeout(() => {
            document.getElementById('pre-loader').remove()
        }, 500)
    }
}

// Inicie el script a continuación en la ventana de la página que se cargó correctamente
window.addEventListener("load", () => {
    (function() {
        // Event Listener para generar una contraseña aleatoria (Randmom)
        var form = document.getElementById('generate-form')
        form.addEventListener('submit', function(e) {
            e.preventDefault()
            start_loader()
            var pwLength = document.getElementById('password_length').value
            var containUpper = document.getElementById('upperCharacters').checked
            var containLower = document.getElementById('lowerCharacters').checked
            var containNumeric = document.getElementById('numericCharacters').checked
            var containSpecial = document.getElementById('specialCharacters').checked
            var chars = "";
            const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowerChars = "abcdefghijklmnopqrstuvwxyz";
            const numericChars = "0123456789";
            const specialChars = "%$*{}[]()^#@!+-.?:_";
            if (containUpper)
                chars += upperChars;
            if (containLower)
                chars += lowerChars;
            if (containNumeric)
                chars += numericChars;
            if (containSpecial)
                chars += specialChars;
            if (chars.length > 0 && pwLength > 0) {
                var generatePass = Array(parseInt(pwLength)).fill(chars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
                document.getElementById('generated-password').value = generatePass
            } else if (pwLength < 1) {
                alert("Establezca la longitud de la contraseña");
            } else {
                alert("Marque al menos 1 tipo de carácter para generar");
            }
            end_loader()


        })

        // Event Listener para copiar la contraseña generada al portapapeles
        document.getElementById('copy_to_clipboard').addEventListener('click', function(e) {
            e.preventDefault()
            var password = document.getElementById('generated-password').value
            navigator.clipboard.writeText(password)

            var el = document.createElement("div")
            el.classList.add('px-2')
            el.classList.add('py-2')
            el.classList.add('rounded')
            el.classList.add('border')
            el.classList.add('border-info')
            el.classList.add('text-info')
            el.innerHTML = "<i class='fa fa-check'></i> Contraseña generada copiada al portapapeles";
            document.getElementById("msg").innerHTML = "";
            document.getElementById("msg").appendChild(el)
            el.style.display = "block"

            setTimeout(() => {
                el.remove()
            }, 2500)
        })

    })();
})