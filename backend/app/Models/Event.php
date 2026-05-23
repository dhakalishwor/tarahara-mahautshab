<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'date',
        'time',
        'location',
        'capacity',
        'registered_count',
        'image_url',
        'agenda',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'date' => 'date',
        'agenda' => 'array',
    ];

    /**
     * Get all registrations for this event
     */
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    /**
     * Check if event has available slots
     */
    public function hasAvailableSlots()
    {
        return $this->registered_count < $this->capacity;
    }

    /**
     * Get remaining slots
     */
    public function getRemainingSlots()
    {
        return $this->capacity - $this->registered_count;
    }
}
