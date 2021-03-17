sap.ui
		.controller(
				"sources.controller.Users",
				{
	model: {},
	usersDataSource: {},
	services: {},

	onInit: async function(evt) {
		model = new sap.ui.model.json.JSONModel()
		await model.loadData("sources/data/users.json");

		usersDataSource = JSON.parse(model.getJSON());

		this.loadFromDataSource(usersDataSource)

	},
	loadFromDataSource: function(dataSource) {
		model.setData(dataSource);
		this.getView().setModel(model, "users");

	},

	onListItemPress: function (event) {
		app.to("idServices", "slide");
		console.log("clicked");
	},

	onHeaderPress: async function(event) {
		let servicesModel = new sap.ui.model.json.JSONModel()
		await servicesModel.loadData("sources/data/static.json");

		this.services = JSON.parse(servicesModel.getJSON());

		servicesModel.setData(this.services);
		console.log(servicesModel);
		await this.getView().setModel(servicesModel, "services");

		let oModel = this.getView().getModel();
		let container = this.getView().byId("grid1");
		let card = new sap.f.Card();
		let header = new sap.f.cards.Header({
			title: "Services"
		});
		let layoutData = new sap.f.GridContainerItemLayoutData({
			minRows: 3,
			columns: 4
		})

		let table = new sap.m.Table({
			id: "tableId",
			growing: "true",
			growingThreshold: 5,
			columns:[
				new sap.m.Column({
					header: [
						new sap.m.Label({
							text: "service"
						})
					]
				}),
				new sap.m.Column({
					header: [
						new sap.m.Label({
							text: "result"
						})
					]
				}),
				new sap.m.Column({
					header: [
						new sap.m.Label({
							text: "resultMessage"
						})
					]
				})
			]
		});

		table.bindAggregation("items", {
			path: "services>/data",
			template:  new sap.m.ColumnListItem({
				type: sap.m.ListType.Navigation,
				press: this.onItemPress,
				cells:[
					new sap.m.Text({text:"{services>service}"}),
					new sap.m.Text({text:"{services>result}"}),
					new sap.m.Text({text:"{services>resultMessage}"})
				]
			})
		});
		console.log(this.getView().getModel());
		table.setFixedLayout(false);
		table.setModel(oModel, "mainModel");

		card.setHeader(header);
		card.setContent(table);
		card.setLayoutData(layoutData);
		container.addItem(card);
	},

	onItemPress: async function (event) {
		console.log(event);
		var bindingContext = event.getSource().getBindingContext("services");
		var recordId = bindingContext.getProperty("threadId");
		var myObject = bindingContext.getObject();
		//app.to("idServiceData", "slide", bindingContext);
		console.log(recordId);
		console.log(myObject.service);

		let serviceDataModel = new sap.ui.model.json.JSONModel()

		serviceDataModel.setData(myObject);
		console.log(servicesModel);
		await this.getView().setModel(serviceDataModel, "serviceData");

		let oModel = this.getView().getModel();
		let container = this.getView().byId("grid1");
		let card = new sap.f.Card();
		let header = new sap.f.cards.Header({
			title: "Services"
		});
		let layoutData = new sap.f.GridContainerItemLayoutData({
			minRows: 3,
			columns: 4
		})
	}
});