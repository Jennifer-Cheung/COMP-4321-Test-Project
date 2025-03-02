import { Entry } from "@/types"

type ResultTableProps = {
    entries: Entry[]
}

const ResultTable = ({ entries }: ResultTableProps) => {
    return (
        <div className="w-full flex flex-col gap-8">
            <span>{entries.length} result(s) displayed</span>
            <div className="flex flex-col gap-5">
                {entries.map((entry, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <span>{entry.title}</span>
                        <span>{entry.url}</span>
                        <span>{entry.content}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResultTable
