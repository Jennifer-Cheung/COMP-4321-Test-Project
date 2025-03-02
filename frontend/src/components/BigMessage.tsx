type BigMessageProps = {
    children: string
}

const BigMessage = ({ children }: BigMessageProps) => {
    return (
        <div className="h-full">
            <h1 className="text-2xl">{children}</h1>
        </div>
    )
}

export default BigMessage
