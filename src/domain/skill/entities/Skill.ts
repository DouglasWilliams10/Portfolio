export interface SkillProps {
  name: string;
  category: string;
  level: string;
}

export class Skill {
  private readonly props: SkillProps;

  constructor(props: SkillProps) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get category(): string {
    return this.props.category;
  }

  get level(): string {
    return this.props.level;
  }
}