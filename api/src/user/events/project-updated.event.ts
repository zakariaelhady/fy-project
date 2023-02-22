export class ProjectUpdatedEvent {
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly description?: string,
    ) {}

    toString() {
        return JSON.stringify({
            id: this.id,
            body: {
                name: this.name,
                description: this.description
            }
        });
    }
}