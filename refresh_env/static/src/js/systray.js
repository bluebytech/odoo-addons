odoo.define('bbt.refresh_env.menu', function (require) {
"use strict";

var config = require('web.config');
var SystrayMenu = require('web.SystrayMenu');
var Widget = require('web.Widget');

/**
 *
 *
 */
var RefreshEnvMenu = Widget.extend({
    name: 'refresh_menu',
    template:'bbt.refresh_env.menu',
    events: {
        'click .o_bbt_refresh_env_action': '_onRefreshEnvActionClick',
    },
    _onRefreshEnvActionClick: function (ev) {
        // INFO: spins the fa-refresh icon.
        this.$el.off('mouseenter mouseleave').find('i').addClass('fa-spin text-warning');

        var self = this;
        self._rpc({
            model: 'ir.module.module',
            method: 'refresh_env',
            args: [window.location.href]
        }).then(function (action) {
            if (action) {
                self.do_action(action);
            }
        });

        // INFO: prevents anchor <a> href (href="#") to show root app menu and jump back to previous form.
        return false;
    },
});

if (config.isDebug()) {
    SystrayMenu.Items.push(RefreshEnvMenu);
}

return RefreshEnvMenu;

});
