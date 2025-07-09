import { Room } from "src/modules/rooms/entities/room.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User, user => user.reservations, { nullable: false})
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Room, room => room.reservations, { nullable: false})
    @JoinColumn({ name: "room_id" })
    room: Room;

    @Column("timestamp")
    start_date: Date;

    @Column("timestamp")
    end_date: Date;

    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column("timestamp", { default: null })
    @UpdateDateColumn()
    updatedAt: Date;
}
