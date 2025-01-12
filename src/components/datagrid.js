'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineDownload, AiOutlineSortAscending, AiOutlineDown } from 'react-icons/ai';
import api from '@/utils/api';

const ProductionGrid = () => {
    const [materials, setMaterials] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMaterials = async() => {
            try{
                const response = await api.get('/materials');
                setMaterials(response.data);
            } catch (error) {
                setError('Error obteniendo materiales');
                console.error(error);
            }
        };
        getMaterials();
    }, []);

    const downloadCSV = () => {
        alert('Downloading CSV...');
    };

    const handleSortByName = () => {
        console.log('Sorting by name...');
    };

    return (
        <>
        <div className='p-4'>
            <div className='flex w-full'>
                <div className='flex w-1/3'>
                    <input
                      id="consulata"
                      name="consulta"
                      type="text"
                      value={undefined}
                      onChange={(e) => setPartNum(e.target.value)}
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Buscar"
                    />
                    <button className='bg-blue-800 hover:bg-blue-900 text-white font-bold items-center py-2 px-4 rounded inline-flex' > 
                        Buscar
                    </button>
                </div>
                <div className='flex w-2/3 space-x-4 place-content-end'>
                    <button onClick={handleSortByName} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
                        <AiOutlineSortAscending className='mr-2' /> Ordenar por Nombre
                    </button>
                    <button onClick={handleSortByName} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
                        <AiOutlineDown className='mr-2' /> Ordenar por Ubicación
                    </button>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='p-2'>
                    <div className='overflow-x-auto'>
                        {error && <p>{error}</p>}
                        {!error && materials.length > 0 && (
                            <table className='max-w-full table-auto'>
                                <thead className='bg-blue-800'>
                                    <tr className='text-white'>
                                        <th className='px-4 py-2'>id</th>
                                        <th className='px-4 py-2'>Numero de parte</th>
                                        <th className='px-4 py-2'>Numero de serie</th>
                                        <th className='px-4 py-2'>Cantidad en kilos</th>
                                        <th className='px-4 py-2'>Cantidad en metros</th>
                                        <th className='px-4 py-2'>Operador</th>
                                        <th className='px-4 py-2'>Clasificacion</th>
                                        <th className='px-4 py-2'>Tipo</th>
                                        <th className='px-4 py-2'>Ubicación</th>
                                        <th className='px-4 py-2'>Fecha de produccion</th>
                                        <th className='px-4 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {materials.map((material) => (
                                        <tr key={material.id_material} className='border-r-stone-900 odd:bg-slate-300 even:bg-gray-300 text-black'>
                                            <td className='px-4 pt-2'>
                                                <div className='flex items-center jsutify-center h-full'>
                                                    {material.id_material}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='px-4 py-2 flex justify-center h-full'>
                                                    {material.num_parte}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.numero_serie}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.cant_kilos}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.cant_metros}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.user}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.nombre_clasificacion}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.tipo}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.ubicacion}
                                                </div>
                                            </td>
                                    
                                            <td className='px-4 py-2'>
                                                <div className='flex items-center justify-center h-full'>
                                                    {material.fecha_produccion}
                                                </div>
                                            </td>
                                            <td className='px-4 py-2 flex justify-start items-center space-x-2'>
                                                <div className='flex items-center gap-4 h-full'>
                                                    <button className='text-blue-500 hover:text-blue-700'><AiOutlineEdit /></button>
                                                    <button className='text-red-500 hover:text-red-700'><AiOutlineDelete /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className='p-4'>        
                        <button onClick={downloadCSV} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
                            <AiOutlineDownload className='mr-12' /> Export to CSV
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductionGrid;