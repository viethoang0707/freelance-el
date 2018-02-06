import { Observable, Subject } from 'rxjs/Rx'
import { Group } from '../models/group.model';
import { UserLog } from '../models/log.model';
import * as _ from 'underscore';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportUtils {

	constructor() {
	}

	createowGroupMetaData(records: any, key: string) {
		var rowGroupMetadata = {};
		if (records) {
			for (let i = 0; i < records.length; i++) {
				let rowData = records[i];
				let value = rowData[key];
				if (i == 0) {
					rowGroupMetadata[key] = { index: 0, size: 1 };
				}
				else {
					let previousRowData = records[i - 1];
					let previousRowGroup = previousRowData[key];
					if (value === previousRowGroup)
						rowGroupMetadata[key].size++;
					else
						rowGroupMetadata[key] = { index: i, size: 1 };
				}
			}
		}
		return rowGroupMetadata;
	}

	analyzeActivity(logs: UserLog[]) {
		var first = null;
		var last = null;
		var onTime = 0;
		_.each(logs, function(log) {
			var start = log.start ? new Date(log.start) : null;
			var end = log.end ? new Date(log.end) : null;
			if (start && (!first || first.getTime() > start.getTime()))
				first = start;
			if (end && (!last || last.getTime() < end.getTime()))
				last = end;
			if (start && end) 
				onTime = end.getTime() - start.getTime();
		});
		return [first, last, onTime];
	}

}
