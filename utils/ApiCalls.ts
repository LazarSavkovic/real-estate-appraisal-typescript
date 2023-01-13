import axios from 'axios';
import { AptType } from './types';
import { FlatType } from './types';


axios.defaults.baseURL = process.env.NEXT_APP_URL


// APTS

export const getApts = async (): Promise<AptType[]> => {

    try {
        const { data: apts, status } = await axios.get<AptType[]>('/api/apts')
        // console.log(data)
        console.log("response status is", status)
        return apts
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }

    }
}

export const getApt = async (id: string): Promise<AptType> => {

    try {
        const { data: apt, status } = await axios.get<AptType>(`/api/apts/${id}`)
        // console.log(data)
        console.log("response status is", status)
        return apt
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}



export const postApt = async (form: AptType): Promise<AptType> => {

    try {
        const { data: newApt, status } = await axios.post<AptType>('/api/apts', form)
        // console.log(data)
        console.log("response status is", status)
        return newApt
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }

}



export const updateApt = async ({ form, id }: { form: AptType, id: string }): Promise<AptType> => {

    try {
        const { data: updatedApt, status } = await axios.put<AptType>(`/api/apts/${id}`, form)
        // console.log(data)
        console.log("response status is", status)
        return updatedApt
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}

export const deleteApt = async (id: string): Promise<AptType> => {
    try {
        const { data: deletedApt, status } = await axios.delete<AptType>(`/api/apts/${id}`)
        // console.log(data)
        console.log("response status is", status)
        return deletedApt
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}





// FLATS

export const getFlats = async (userId: string): Promise<FlatType[]> => {
    try {
        const { data: flats, status } = await axios.get<FlatType[]>(`/api/flats?id=${userId}`)
        // console.log(data)
        console.log("response status is", status)
        return flats
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}

export const getFlat = async ({ userId, flatId }: {userId: string, flatId: string}): Promise<FlatType> => {
    try {
        const { data: flat, status } = await axios.get<FlatType>(`/api/flats/${flatId}?userid=${userId}`)
        // console.log(data)
        console.log("response status is", status)
        return flat
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}


export const postFlat = async (formWithAuthor: FlatType): Promise<FlatType> => {
    try {
        const { data: newFlat, status } =  await axios.post<FlatType>('/api/flats', formWithAuthor)
        // console.log(data)
        console.log("response status is", status)
        return newFlat
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}


export const updateFlat = async ({ form, id }: { form: FlatType, id: string }): Promise<FlatType>  => {
    try {
        const { data: updatedFlat, status } = await axios.put<FlatType>(`/api/flats/${id}`, form)
        // console.log(data)
        console.log("response status is", status)
        return updatedFlat
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}

export const deleteFlat = async (id: string): Promise<FlatType> => {
    try {
        const { data: deletedFlat, status } = await axios.delete<FlatType>(`/api/flats/${id}`)
        // console.log(data)
        console.log("response status is", status)
        return deletedFlat
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw Error(error.message)
        } else {
            console.log('unexpected error: ', error);
            throw Error("An unexpected error occurred");
        }
    }
}

