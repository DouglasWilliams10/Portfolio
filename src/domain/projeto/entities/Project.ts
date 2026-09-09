export interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  categories: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export class Project {
  private readonly props: ProjectProps;

  constructor(props: ProjectProps) {
    this.props = props;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get technologies(): string[] {
    return this.props.technologies;
  }

  get categories(): string[] {
    return this.props.categories;
  }

  get githubUrl(): string | undefined {
    return this.props.githubUrl;
  }

  get demoUrl(): string | undefined {
    return this.props.demoUrl;
  }

}