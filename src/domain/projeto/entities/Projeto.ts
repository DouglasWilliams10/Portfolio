export interface ProjetoProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
}

export class Projeto {
  private readonly props: ProjetoProps;

  constructor(props: ProjetoProps) {
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

  get category(): string {
    return this.props.category;
  }
}