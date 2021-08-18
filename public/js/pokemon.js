'use strict';

class Pokemon extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			itemsInCart: 0,
			loggedIn: false,
			cartTotal: 0,
			Bulbasaur: false,
			Caterpie: false,
			Charmander: false,
			Pidgey: false,
			Pikachu: false,
			Squirtle: false
		}
		
		this.addToCart = this.addToCart.bind(this);
		this.removeFromCart = this.removeFromCart.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.completeOrder = this.completeOrder.bind(this);
		this.viewItem = this.viewItem.bind(this);
	}

	login(e) {
		analytics.identify("97980cfea0067", {
		  name: "Ash Ketchum",
		  email: "seanhan@helloworld.com"
		});
		this.setState({
			loggedIn: true
		})
	}

	logout(e) {
		this.setState({
			loggedIn: false
		})
	}

	viewItem(e) {
		analytics.track('Product Viewed', {
			product_id: e.target.id,
			name: `Basic ${e.target.id}`,
			price: '$10,000.00'
		});

		//shoving this is in to figure out how product list view works
		analytics.track('Product List Viewed', {
			category: 'Deals',
			list_id: 'hot_deals_1',
			products: [
				{
				  category: 'Games',
				  image_url: 'https://www.example.com/product/path.jpg',
				  name: 'Monopoly: 3rd Edition',
				  position: 1,
				  price: 19,
				  product_id: '507f1f77bcf86cd799439011',
				  sku: '45790-32',
				  url: 'https://www.example.com/product/path'
				},
				{
				  category: 'Games',
				  name: 'Uno Card Game',
				  position: 2,
				  price: 3,
				  product_id: '505bd76785ebb509fc183733',
				  sku: '46493-32'
				}
			]
		});

	}

	addToCart(e) {
		analytics.track('Product Added', {
			product_id: e.target.id,
			name: `Basic ${e.target.id}`,
			price: '$10,000.00'
		});


		this.setState({
			itemsInCart: this.state.itemsInCart + 1,
			cartTotal: this.state.cartTotal + 10,
			[e.target.id]: true
		})
	}

	removeFromCart(e) {
		analytics.track('Product Removed', {
			product_id: e.target.id,
			name: `Basic ${e.target.id}`,
			price: '$10,000.00'
		});

		this.setState({
			itemsInCart: this.state.itemsInCart === 0 ? 0 : this.state.itemsInCart - 1,
			cartTotal: this.state.itemsInCart === 0 ? 0 : this.cartTotal - 10,
			[e.target.id]: false
		})
	}

	completeOrder(e) {	

		let productIds = [];
		Object.keys(this.state).forEach(key => {
			console.log(key, productIds)
			if (this.state[key] === true) productIds.push(key)
		})

		analytics.track('Order Completed', {
			order_id: Date.now(),
			total: this.state.itemsInCart * 10000,
			productIds: productIds
		});

		this.setState({
			itemsInCart: 0,
			Bulbasaur: false,
			Caterpie: false,
			Charmander: false,
			Pidgey: false,
			Pikachu: false,
			Squirtle: false,
		})
	}

	render() {
		const items = [];
		const pokemon = [
			{
				productName: "Bulbasaur",
				productPrice: "$10,000.00",
				productId: 1,
				productImage: 'bulbasaur.jpeg'
			},
			{
				productName: "Caterpie",
				productPrice: "$10,000.00",
				productId: 2,
				productImage: 'caterpie.jpeg'
			},
			{
				productName: "Charmander",
				productPrice: "$10,000.00",
				productId: 3,
				productImage: 'charmander.jpeg'
			},
			{
				productName: "Pidgey",
				productPrice: "$10,000.00",
				productId: 4,
				productImage: 'pidgey.jpeg'
			},
			{
				productName: "Pikachu",
				productPrice: "$10,000.00",
				productId: 5,
				productImage: 'pikachu.jpeg'
			},
			{
				productName: "Squirtle",
				productPrice: "$10,000.00",
				productId: 6,
				productImage: 'squirtle.jpeg'
			}
		]

		for (const [index, value] of pokemon.entries()) {
			let imagePath = `/images/${value.productImage}`
			let item = (
				/*<div className="row" key={index}>*/
					<div className="col-4">
						<img src={imagePath} />
						<h4 className="font-light">-{value.productName}-</h4>
						<div className="font-light">Price: {value.productPrice}</div>
						<div className="font-light">
							<a href="#" id={value.productName} onClick={this.viewItem}>View</a>
						</div>
						<div className="font-light">
							<a href="#" id={value.productName} onClick={this.state[value.productName] ? this.removeFromCart : this.addToCart}>{this.state[value.productName] ? '-Remove' : '+Add'}</a>
						</div>
					</div>
				/*</div>*/
			)

			items.push(item);
		}

		return (
			<div>
				<div className="font-light">
					<a href="#" id="login" onClick={this.state.loggedIn ? this.logout : this.login}>{this.state.loggedIn ? "Welcome Sean! (Log Out)" : "Log In "} </a>
					 | Items in cart: {this.state.itemsInCart} |
					 <a href="#" id="order_confirmation" onClick={this.completeOrder}> {this.state.itemsInCart > 0 && !this.orderComplete ? "1-Click Buy ($" + this.state.cartTotal + "K)"  : ""}</a>
				</div>
				<div className="font-light">
					__________________________________
				</div>
				<div>
					{items}
				</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Pokemon />,
	document.getElementById('pokemon')
)


