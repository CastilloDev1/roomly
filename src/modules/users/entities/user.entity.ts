import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    @Column("text")
    name: string;
    @Column("text")
    email: string;
    @Column("text")
    password: string;
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}