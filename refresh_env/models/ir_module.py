# -*- coding: utf-8 -*-
from odoo import api, models, modules


class Module(models.Model):
    _inherit = "ir.module.module"

    @api.model
    def refresh_env(self, redirect_url=None):

        self._cr.commit()
        api.Environment.reset()
        modules.registry.Registry.new(self._cr.dbname, update_module=True)

        self._cr.commit()
        env = api.Environment(self._cr, self._uid, self._context)

        # INFO: sudoing in case user doing refresh has not permission to access.
        config = env['ir.module.module'].sudo().next() or {}
        if config.get('type') not in ('ir.actions.act_window_close',):
            if redirect_url:
                config['url'] = redirect_url
            return config

        # INFO: reloads the client; open the first available root menu.
        menu = env['ir.ui.menu'].search([('parent_id', '=', False)])[:1]
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
            'params': {'menu_id': menu.id},
        }
