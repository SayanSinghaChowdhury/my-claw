import { isMutationType, type ActionLog, type ActionStatus } from "./type";

export class ActionTrackerMethod {
	private action: ActionLog[] = [];

	log(
		entry: Omit<ActionLog, "id" | "timestamp"> & {
			id: string;
			timestamp: Date;
		},
	): ActionLog {
		const action: ActionLog = {
			id: entry.id ?? `action_${this.action.length}`,
			timestamp: entry.timestamp ?? new Date(),
			type: entry.type,
			path: entry.path,
			details: { ...entry.details },

			status: entry.status,
			userApproved: entry.userApproved,
		};
		this.action.push(action);
		return action;
	}
	getAction(): readonly ActionLog[] {
		return this.action;
	}
	getPendingMutation(): ActionLog[] {
		return this.action.filter(
			(xData) => isMutationType(xData.type) && xData.status === "pending",
		);
	}

	getUpdateStatus(
		id: string,
		status: ActionStatus,
		userApproved?: boolean,
	): void {
		const a = this.action.find((y) => y.id === id);
		if (!a) return;

		a.status = status;

		if (userApproved === undefined) a.userApproved = userApproved;
	}
}
