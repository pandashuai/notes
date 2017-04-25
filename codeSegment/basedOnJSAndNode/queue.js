"use strict";
// 队列(queue)
var queue = function (tasks, taskMethod, complete, parallel) {
	// 任务回调方法(Task callback method) taskMethod ; 所有任务完成回调方法(All tasks complete the callback method) complete
	if(!tasks || !taskMethod || !complete) {
		return false;
	};

	// 任务列表(task list)
	var tasksArray = [];
	for (var prop in tasks) {
		tasksArray.push({
			prop: prop,
			task: tasks[prop]
		});
	}

	if(tasksArray.length <= 0){
		return complete(false);
	}


	// 并列数(Number of parallel)
	parallel = parallel || tasksArray.length;

	// 并列状态(Side by side)
	var parallelStatus = new Array(parallel);

	// 并列占用数量(Number of parallel occupancy)
	var parallelStatusLength = 0;

	// 成功回调存储的对象(Successfully callback the stored object)
	var completeData = {};

	var start = function () {
		if(!tasksArray.length) return ;
		// 循环并列状态检测空余的位置(Loop the parallel state to detect the remaining position)
		for (var i = 0; i < parallelStatus.length; i++) {

			// 没有任务进入监听状态(No task to enter the listening state)
			if(!tasksArray.length) break ;
			// 如果有空余的位置执行任务处理(If there are spare positions to perform task processing)
			if (!parallelStatus[i]) {
				// 获取任务(Get the task)
				var task = tasksArray.shift();
				// 递增并列占用数量(Increasing the number of parallel occupancy)
				parallelStatusLength += 1;
				// 记录任务ID(Record the task ID)
				parallelStatus[i] = task.prop;
				
				// 任务处理(Task processing)
				taskProcess(task);
			}

		}
	};

	var taskProcess = function (task) {
		setTimeout(function() {
			taskMethod(task.task, completeData, function (data) {
				// 查找任务在并列状态所在位置(Find the location of the task in parallel state)
				var index = parallelStatus.indexOf(task.prop);
				// return;
				if(index >= 0) {
					// 清除并列状态(Clear the parallel state)
					parallelStatus[index] = false;

					// 递减并列占用数量(Decreasing the number of parallel occupancy)
					parallelStatusLength -= 1;

					// 存储回调的数据(Store the callback data)
					completeData[task.prop] = data;
					
					if(tasksArray.length) {
						start();
					}else if(!tasksArray.length && parallelStatusLength === 0){
						complete(completeData);
					}
				}
			});
		}, 0);
	};

	start();
};
