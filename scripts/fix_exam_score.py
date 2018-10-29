import erppeek
client = erppeek.Client('http://localhost:8069', 'nissan-erp', 'admin','nssw1234')
for exam in client.model('etraining.exam').browse([]):
	grades = client.model("etraining.exam_grade").browse([('exam_id','=',exam.id)])
	for member in exam.member_ids:
		if member.submission_id:
			score = 0
			question_ids = set()
			for answer in client.model('etraining.answer').browse([('submission_id','=',member.submission_id.id)]):
				if answer.question_id: 
					if answer.question_id.id not in question_ids:
						score += answer.score
						question_ids.add(answer.question_id.id)
					else:
						answer.unlink()
						print 'Unlink ', answer.id
				else:
						answer.unlink()
						print 'Unlink ', answer.id
			grade_name =''
			for grade in grades:
				if grade.max_score >= score and grade.min_score <= score:
					grade_name = grade.name
					break
			member.submission_id.write({'score':score,'grade':grade_name})
			if member.exam_record_id:
				member.exam_record_id.write({'score':score,'grade':grade_name})