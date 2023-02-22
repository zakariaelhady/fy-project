export class ProjectCreatedEvent {
    constructor(
        public readonly name: string,
        public readonly description: string,
    ) {}

    toString() {
        return JSON.stringify({
            name: this.name,
            description: this.description
        });
    }
}