# -*- coding: utf-8 -*-

{
    'name': 'Refresh Env',
    'version': '13.0.1',
    'category': 'Tools',
    'summary': 'Refresh Odoo Environment',
    'description': """
This modules adds a special refresh button to the top menu bar (when debug is activated) that lets you refresh the client/server environment.
This is quite useful when you perform a command line odoo update and you want to fully refresh Odoo environment with no need to update the
module thru the odoo apps menu facilities.
""",
    'website': '',
    'depends': ['web'],
    'data': [
        'views/assets.xml',
    ],
    'qweb': [
        'static/src/xml/*.xml'
    ],
    'installable': True,
    'application': False,
    'auto_install': False
}
