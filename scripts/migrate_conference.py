import erppeek


source_client = erppeek.Client('http://elearning.vietinterview.com:8069', 'tcac-erp', 'admin','123456')
target_client = erppeek.Client('http://elearning.vietinterview.com:8069', 'meeting-erp', 'admin','123456')
for conference in source_client.model('etraining.conference').browse([]):
	print 'Create room: ', conference.name
	room = target_client.model('emeeting.room').create({'name':conference.name,'category':'one-to-many','ref':conference.room_ref,'password':conference.room_pass})
	for member in conference.member_ids:
		print 'Create member: ', member.name
		room_member = target_client.model('emeeting.member').create({'name':member.name,'avatar':member.user_id.image,'email': member.user_id.email,'room_id':room.id,'is_supervisor': member.course_member_id and member.course_member_id.role=='supervisor'})
