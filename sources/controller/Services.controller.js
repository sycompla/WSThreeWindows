sap.ui
		.controller(
				"sources.controller.Services",
				{


	onInit: async function(evt) {
		
		var oModel = new sap.ui.model.json.JSONModel();
		await oModel.loadData("sources/data/static.json");

		this.productsDataSource = JSON.parse(oModel.getJSON());
		console.log(this.productsDataSource)

		this.loadFromDataSource(this.productsDataSource, oModel)
    },
	loadFromDataSource: function(dataSource, oModel) {
		oModel.setData(dataSource, "products");
		this.getView().setModel(oModel);
		console.log(this.getView().getModel());
	},

	onListItemPress : function(event) {
		var bindingContext = event.getSource().getBindingContext();
		var recordId = bindingContext.getProperty("threadId");
		var myObject = bindingContext.getObject();
		app.to("idServiceData", "slide", bindingContext);
		console.log("clicked");
	},
	handleNavButtonPress : function(evt) {
		app.back();
	},

    });