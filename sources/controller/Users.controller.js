sap.ui
		.controller(
				"sources.controller.Users",
				{
	model: {},
	usersDataSource: {},

	onInit: async function(evt) {
		model = new sap.ui.model.json.JSONModel()
		await model.loadData("sources/data/users.json");

		usersDataSource = JSON.parse(model.getJSON());

		this.loadFromDataSource(usersDataSource)

	},
	loadFromDataSource: function(dataSource) {
		model.setData(dataSource);
		this.getView().setModel(model);

	},

	onListItemPress: function (event) {
		app.to("idServices", "slide");
		console.log("clicked");
	}
});