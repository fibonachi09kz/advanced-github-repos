import React from 'react'
import {useAppSelector} from '../hooks/redux'

export function FavouritesPage() {
    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) return <p className="text-center py-2 text-medium font-medium text-gray-900">В избранном ничего нет</p>

    return (
        <div className="flex justify-center pt-10 mx-auto">
              <ul className="list-none">
                    { favourites.map(f => (
                          <li className="mb-2" key={f}>
                            <a href={f} target="_blank" className="text-gray-900 font-medium hover:text-gray-600">{f}</a>
                          </li>
                    )) }
              </ul>
        </div>
    )
}