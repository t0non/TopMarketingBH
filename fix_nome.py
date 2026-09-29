with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

OLD = """    if (nomeInput) {
      nomeInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        this.value = toTitleCase(this.value.toLowerCase());
        this.setSelectionRange(pos, pos);
      });
    }"""

NEW = """    if (nomeInput) {
      nomeInput.addEventListener('keypress', function(e) {
        // Block digits and special chars - allow only letters, spaces, hyphens, apostrophes
        if (!/[a-zA-ZáàâãéèêíïóôõöúüçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÜÇÑ\\s\\-\\']/.test(e.key)) {
          e.preventDefault();
        }
      });
      nomeInput.addEventListener('input', function() {
        var pos = this.selectionStart;
        // Remove digits and unwanted chars
        var cleaned = this.value.replace(/[0-9@#$%^&*()_+=\\[\\]{};:"\\\\|<>,.?/!~`]/g, '');
        this.value = toTitleCase(cleaned.toLowerCase());
        this.setSelectionRange(Math.min(pos, this.value.length), Math.min(pos, this.value.length));
      });
    }"""

if OLD in content:
    content = content.replace(OLD, NEW)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Nome field updated - numbers blocked!")
else:
    print("Pattern not found!")
