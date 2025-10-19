import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "guitar" })
export class Guitar {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  shortDescription: string;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;
}
