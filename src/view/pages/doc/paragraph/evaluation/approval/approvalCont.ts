import { Approval, getStatementSubscriptionId, User } from "delib-npm";

export class ApprovalClass {
    private statementId: string;
    private topParentId: string;
    private userId: string;
    private documentId: string;
    private approvalId: string;
    private approval: boolean;
    constructor({ statementId, topParentId, user, documentId, approval = true }: { statementId: string, topParentId: string, user: User, documentId: string, approval?: boolean }) {

        this.approval = approval;
        this.approvalId = getStatementSubscriptionId(statementId, user) || "";
        this.documentId = documentId;
        this.statementId = statementId;
        this.topParentId = topParentId;
        this.userId = user.uid;


    }
    public getStatementId() {
        return this.statementId;
    }

    get approvalObj(): Approval {
        return {
            approval: this.approval,
            approvalId: this.approvalId,
            documentId: this.documentId,
            statementId: this.statementId,
            topParentId: this.topParentId,
            userId: this.userId,
        }
    }
}