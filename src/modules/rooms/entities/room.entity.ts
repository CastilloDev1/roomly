import { Reservation } from "src/modules/reservations/entities/reservation.entity";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    name: string;

    @Column("integer")
    max_capacity: number;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { default: null })
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Reservation, reservation => reservation.room)
    reservations: Reservation[];
}
