export class GetUserProjectsEvent {
    constructor(
        public readonly projects: string[],
    ) {}

    toString() {
        return JSON.stringify({
            projects: this.projects
        });
    }
}