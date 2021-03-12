sap.ui
		.controller(
				"sources.controller.ServiceData",
				{
		handleNavButtonPress : function(evt) {
			app.back();
		},
					
		toBoolean: function(fValue) {
			console.log(fValue);
			if(fValue === "true") {
				return true;
			}
			else {
				return false
			};
		},
		onInit : function(oEvent) {

			this
			.getView()
			.addDelegate(
					{
						onBeforeShow : function(evt) {
							console.log(evt.data);
							if (this.direction != "back") {
								if (evt.data.oModel != null) {
									evt.to.setModel(evt.data.oModel);
									evt.to.setBindingContext(evt.data);
								} else {
									var oModel = new sap.ui.model.odata.v4.ODataModel({
										groupId: "$direct",
										synchronizationMode : "None",
										serviceUrl : "https://89.40.120.71:8011/odata/"
									});
									evt.to.setModel(oModel);
								}
							}
						}
					});
		},
});