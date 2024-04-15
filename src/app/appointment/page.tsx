import Container from "@/components/Container";
import prisma from "@/db/client";
import AppointmentClient from "./_components/AppointmentClient";

const Appointment = async () => {
  try {
    await prisma.$disconnect();

    const data = await prisma.appointment.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        checked: false
      },
      include:{
        chosenTherapy:{
          select:{
            name:true
          }
        }
      }
    });
    await prisma.$disconnect();

    const formattedData = data.map(appointment => ({
      therapyName: appointment.chosenTherapy.name,
      name: appointment.name,
      id: appointment.id,
      email: appointment.email,
      tel: appointment.tel,
      destek: appointment.destek,
      service: appointment.service,
      contact: appointment.contact,
      place: appointment.place,
      checked: appointment.checked,
      therapyId: appointment.therapyId,
      createdAt: appointment.createdAt,
    }));
    
    
    return (
      <div>
        <Container>
          <div className="flex flex-col ">
            <div className="flex-1 space-y-4 p-8 pt-6">
              <AppointmentClient data={formattedData}/>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (err) {
  } finally {
    await prisma.$disconnect();
  }
};

export default Appointment;