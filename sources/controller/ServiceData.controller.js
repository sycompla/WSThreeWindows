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

								}
							}
						}
					});
		},
});