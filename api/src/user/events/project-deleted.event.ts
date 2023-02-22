export class ProjectDeletedEvent {
    constructor(
        public readonly id: string,
    ) {}

    toString() {
        return JSON.stringify({
            id: this.id
        });
    }
}