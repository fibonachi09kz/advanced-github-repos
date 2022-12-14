import React from 'react'
import {Link} from 'react-router-dom'

export function Navigation() {
      return (
            <div className="p-8 bg-gray-800">
                <div className="max-w-7xl mx-auto">

                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                                Поиск репозиториев Github
                            </h2>
                        </div>
                        <div className="mt-4 flex md:mt-0 md:ml-4">
                            <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">Главная</Link>
                            <Link to="/favourites" className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">Избранное</Link>
                        </div>
                    </div>
                </div>
            </div>
      )
}