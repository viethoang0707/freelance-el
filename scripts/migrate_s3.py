import erppeek
import boto
import boto3
import os.path
import os
from boto.s3.connection import S3Connection
from boto.s3.connection import OrdinaryCallingFormat
client = erppeek.Client('http://localhost:8069', 'nissan-erp', 'admin','123456')

for scorm in client.model('etraining.scorm_lecture').browse([]):
	attachments = client.model('ir.attachment').browse([('res_id','=',scorm.id),('res_model','=','etraining.scorm_lecture')])
	if len(attachments) >=1:
		attachment = attachments[0]
		print attachment.url
		scorm.write({'package_file_id':attachment.id})
for slide in client.model('etraining.slide_lecture').browse([]):
	attachments = client.model('ir.attachment').browse([('res_id','=',slide.id),('res_model','=','etraining.slide_lecture')])
	if len(attachments) >=1:
		attachment = attachments[0]
		print attachment.url
		slide.write({'slide_file_id':attachment.id})
for video in client.model('etraining.video_lecture').browse([]):
	attachments = client.model('ir.attachment').browse([('res_id','=',video.id),('res_model','=','etraining.video_lecture')])
	if len(attachments) >=1:
		attachment = attachments[0]
		print attachment.url
		video.write({'attachment_id':attachment.id})

for material in client.model('etraining.course_material').browse([]):
	attachments = client.model('ir.attachment').browse([('res_id','=',material.id),('res_model','=','etraining.course_material')])
	if len(attachments) >=1:
		attachment = attachments[0]
		print attachment.url
		material.write({'material_file_id':attachment.id})

		
bucket_name='blob-pti-vietinterview-com'
s3 = boto3.resource('s3',aws_access_key_id='AKIAI4GDYQSDD2H5BTKA',aws_secret_access_key='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')
client = boto3.client('s3',aws_access_key_id='AKIAI4GDYQSDD2H5BTKA',aws_secret_access_key='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')
conn = boto.connect_s3(aws_access_key_id='AKIAI4GDYQSDD2H5BTKA',aws_secret_access_key='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', calling_format=OrdinaryCallingFormat())
bucket = conn.get_bucket(bucket_name)
bucket_location = bucket.get_location()
for scorm in client.model('etraining.scorm_lecture').browse([]):
	if scorm.package_url:
		print 'scorm %s' % scorm.name, scorm.id
		print scorm.package_url
		parts = scorm.package_url.split('/')
		key = parts[-1]
		path = '/root/blob/nissan/%s' %key
		print path
		print key
		if os.path.isfile(str(path)):			
			attachment = client.model('ir.attachment').create({'name':key,'url':scorm.package_url,'datas_fname':key,'res_id':scorm.id,'res_model':'etraining.scorm_lecture'})