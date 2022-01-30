import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ comment: '文件名' })
    file_name!: string

    @Column({ comment: '文件绝对路径' })
    file_path!: string

    @Column({ comment: '文件后缀' })
    file_extname!: string

    @Column({ comment: '展示标题' })
    file_title!: string

    @Column({ comment: '展示内容', type: 'text' })
    file_content!: string

    @Column({ comment: '阅读次数', default: 0 })
    readings!: number

    @CreateDateColumn()
    create_time!: Date

    @UpdateDateColumn()
    update_time!: Date
}
