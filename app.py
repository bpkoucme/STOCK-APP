from flask import Flask, request, render_template_string

app = Flask(__name__)

# Simuler un petit stock
stock = {
    "Chaussures": 10,
    "Pantalons": 5,
    "Chemises": 7
}

# HTML directement dans le code
html = '''
<!doctype html>
<title>Gestion de Stock</title>
<h1>Stock Actuel</h1>
<ul>
{% for article, quantite in stock.items() %}
    <li>{{ article }} : {{ quantite }}</li>
{% endfor %}
</ul>

<h2>Ajouter un article</h2>
<form method="post">
    Article: <input type="text" name="article" required>
    Quantité: <input type="number" name="quantite" required>
    <input type="submit" value="Ajouter">
</form>
'''

@app.route('/', methods=['GET', 'POST'])
def gestion_stock():
    if request.method == 'POST':
        article = request.form['article']
        quantite = int(request.form['quantite'])
        stock[article] = stock.get(article, 0) + quantite
    return render_template_string(html, stock=stock)

if __name__ == '__main__':
    app.run(debug=True)
