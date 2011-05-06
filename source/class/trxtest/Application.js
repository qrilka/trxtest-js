// -*- tab-width: 2 -*-
/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(trxtest/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "trxtest"
 */
qx.Class.define("trxtest.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __tableModel: null,

    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      this.__tableModel = new qx.ui.table.model.Simple();
      this.__tableModel.setColumns([ "ID", "Content"]);

      var wm = new qx.ui.window.Window("Hello World", "icon/16/apps/office-calendar.png");
      wm.setLayout(new qx.ui.layout.VBox(10));
      wm.setModal(true);
      wm.moveTo(150, 150);
      this.getRoot().add(wm, {left: 200, top: 50});

      var table = new qx.ui.table.Table(this.__tableModel);
      wm.add(table);

      var btn = new qx.ui.form.Button("Query Hellos from REST/Pg");
      btn.addListener("execute", this.queryHellos, this);
      wm.add(btn);
      wm.open();
    },

    queryHellos: function() {
      var req = new qx.io.remote.Request("http://localhost:8080/hellos.json", "GET", "application/json");
      req.addListener("completed", function(e) {
          this.__tableModel.setData(e.getContent());
      }, this);
      req.send();
    }
  }
});
