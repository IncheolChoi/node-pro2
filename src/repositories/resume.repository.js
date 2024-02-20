export class ResumesRepository {
    constructor(prisma){
      this.prisma = prisma;
    }

    //이력서 생성//
    createResume = async (title, comment) => {
        // ORM인 Prisma에서 Resumes 모델의 create 메서드를 사용해 데이터를 요청합니다.
        const createdResume = await this.prisma.resumes.create({
          data: {
            title,
            comment,
            // status,
          },
        });
    
        return createdResume;
      };

    //이력서 조회//
    findAllResumes = async () => {
      // ORM인 Prisma에서 Resumes 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
      const resumes = await this.prisma.resumes.findMany();
   
      return resumes;
    };

    //이력서 상세조회//
    findResumeById = async (resumeId) => {
      // ORM인 Prisma에서 Resumes 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
      const resume = await this.prisma.resumes.findUnique({
        where: { resumeId: +resumeId },
      });
  
      return resume;
    };

    
    //이력서 수정//
    updateResume = async (resumeId, title, comment) => {
      // ORM인 Prisma에서 Resumes 모델의 update 메서드를 사용해 데이터를 수정합니다.
      const updatedResume = await this.prisma.resumes.update({
        where: {
          resumeId: +resumeId,
        },
        data: {
          title,
          comment,
        },
      });
  
      return updatedResume;
    };

    //이력서 삭제/
    deleteResume = async (resumeId) => {
      // ORM인 Prisma에서 Resumes 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
      const deletedResume = await this.prisma.resumes.delete({
        where: {
          resumeId: +resumeId,
        },
      });
  
      return deletedResume;
    };
  }
  