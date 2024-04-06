import Container from "@/components/Container"
import Link from "next/link"

const TherapyTypePage = () => {
  return (
    <div>
        <Container>
            <div className="flex flex-col items-center gap-5">
                <div className="w-full flex justify-end">
                    <Link className="btn" href={'/therapyType/create'}>
                        Create
                    </Link>
                </div>

            </div>
        </Container>
        
    </div>
  )
}

export default TherapyTypePage