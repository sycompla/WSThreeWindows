sap.ui
		.controller(
				"sources.controller.Users",
				{
	model: {},
	usersDataSource: {},
	services: {},
					view: {},

	onInit: async function(evt) {
		model = new sap.ui.model.json.JSONModel()
		await model.loadData("sources/data/users.json");

		usersDataSource = JSON.parse(model.getJSON());

		this.loadFromDataSource(usersDataSource);

		view = this.getView();

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
		let bindingContext = event.getSource().getBindingContext("services");
		let recordId = bindingContext.getProperty("threadId");
		let myObject = bindingContext.getObject();
		//app.to("idServiceData", "slide", bindingContext);
		console.log(recordId);
		console.log(myObject.service);

		let serviceDataModel = new sap.ui.model.json.JSONModel()

		serviceDataModel.setData(myObject);
		view.setModel(serviceDataModel, recordId);

		let container = view.byId("grid1");
		let card = new sap.f.Card({
			content: new sap.ui.layout.VerticalLayout({
				content: [
					new sap.m.Label({
						text: "Service"
					}),
					new sap.m.Text({
						text: "{" + recordId + ">/service}"
					}),new sap.m.Label({
						text: "ThreadId"
					}),
					new sap.m.Text({
						text: "{" + recordId + ">/threadId}"
					}),new sap.m.Label({
						text: "Result"
					}),
					new sap.m.Text({
						text: "{" + recordId + ">/result}"
					}),new sap.m.Label({
						text: "Result Message"
					}),
					new sap.m.Text({
						text: "{" + recordId + ">/resultMessage}"
					}),new sap.m.Label({
						text: "Result Description"
					}),
					new sap.m.Text({
						text: "{" + recordId + ">/resultDescription}"
					}),
				]
			})
		});
		let header = new sap.f.cards.Header({
			title: "Service Data"
		});
		let layoutData = new sap.f.GridContainerItemLayoutData({
			minRows: 3,
			columns: 4
		});

		card.setHeader(header);
		card.setLayoutData(layoutData);
		container.addItem(card);
	}
});