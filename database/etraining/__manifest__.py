# -*- coding: utf-8 -*-
{
	'name': "e-Training module for Nissan",

	'summary': """
        Corporate Learning System""",

	'description': """
        e-Training module
    """,

	'author': "Thanh Cong A Chau",
	'website': "http://www.vietinterview.com",

	# Categories can be used to filter modules in modules listing
	# Check https://github.com/odoo/odoo/blob/master/odoo/addons/base/module/module_data.xml
	# for the full list
	'category': 'training e-learning LMS CMS',
	'version': '0.1',

	'application': True,

	# any module necessary for this one to work correctly
	'depends': ['base', 'mail', 'portal'],

	# always loaded
	'data': [
		# 'security/ir.model.access.csv',
		'data/install.xml',
		'data/mail.xml',
	]
}
