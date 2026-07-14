import {
    Button,
    Card,
    Container,
    Input,
    Spinner,
    TextArea,
} from "@/components/ui";

function App() {
    return (
        <Container className="py-10">
            <Card className="space-y-6">
                <h1 className="text-3xl font-bold">
                    AI Search Engine Design System
                </h1>

                <Input placeholder="Search..." />

                <TextArea
                    rows={5}
                    placeholder="Ask anything..."
                />

                <div className="flex gap-4 items-center">
                    <Button>Primary Button</Button>
                    <Spinner />
                </div>
            </Card>
        </Container>
    );
}

export default App;