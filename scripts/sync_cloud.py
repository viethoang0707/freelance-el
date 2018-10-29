import erppeek

client = erppeek.Client('http://srv01.vietinterview.com:8069', 'erp-cloud', 'admin','Adm1Cmv4$')

local_client = erppeek.Client('http://localhost:8069', 'erp-cloud', 'admin','Adm1Cmv4$')

local_client.model('erpcloud.account').browse([]).unlink()

for cloud in client.model('erpcloud.account').browse([]):
		local_client.model('erpcloud.account').create({'code': cloud.code, 'name': cloud.name,
			'logo_url':cloud.logo_url, 'domain':cloud.domain, 'db': cloud.db, 'db_endpoint': cloud.db_endpoint,
			'db_user': cloud.db_user, 'db_pass': cloud.db_pass, 'public_user': cloud.public_user,
			'public_pass': cloud.public_pass, 'date_expire': cloud.date_expire, 'file_physical_dir': cloud.file_physical_dir,
			'file_endpoint': cloud.file_endpoint, 'api_endpoint': cloud.api_endpoint, 's3_enable': cloud.s3_enable,
			's3_bucket': cloud.s3_bucket, 'cloud_front_domain': cloud.cloud_front_domain})